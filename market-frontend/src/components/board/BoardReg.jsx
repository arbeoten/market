import React, { useState, useCallback, useEffect } from 'react'
import { Wrap, Container } from '../../styles/input'
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { fetchCategorysThunk } from '../../features/categorySlice'
import { useDispatch, useSelector } from 'react-redux'

const BoardReg = ({ onSubmit, initialValues = {} }) => {
   const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
   })

   const dispatch = useDispatch()

   const [title, setTitle] = useState(initialValues.title || '')
   const [content, setContent] = useState(initialValues.content || '')
   const [subContent, setSubContent] = useState(initialValues.subContent || '')
   const [price, setPrice] = useState(initialValues.price || '')
   const [categoryId, setCategoryId] = useState(initialValues.categoryId || '')

   const [titleImgFile, setTitleImgFile] = useState(null)
   const [titleImgUrl, setTitleImgUrl] = useState(initialValues.titleImg ? process.env.REACT_APP_API_URL + initialValues.titleImg : '') // 이미지 경로

   const [subImgFile, setSubImgFile] = useState([])
   const [subImgUrl, setSubImgUrl] = useState(initialValues.subImg ? process.env.REACT_APP_API_URL + initialValues.subImg : '') // 이미지 경로

   useEffect(() => {
      if (initialValues.Images) {
         const titleImg = initialValues.Images.find((img) => img.isTitle === true)
         setTitleImgUrl(process.env.REACT_APP_API_URL + titleImg.img)
         const subimgs = initialValues.Images.filter((img) => img.isTitle === false)
         const subImgUrls = subimgs.map((img) => process.env.REACT_APP_API_URL + img.img)
         setSubImgUrl(subImgUrls)
      }
   }, [initialValues.Images])

   // 카테고리 호출
   useEffect(() => {
      dispatch(fetchCategorysThunk())
   }, [dispatch])
   const { categorys } = useSelector((state) => state.category)

   const handleTitleImgChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setTitleImgFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setTitleImgUrl(event.target.result)
      }
   }, [])

   const handleSubImgChange = useCallback((e) => {
      const files = e.target.files
      if (!files) return

      setSubImgFile(files)
      let fileURLs = []

      for (let i = 0; i < files.length; i++) {
         let file = files[i]
         const reader = new FileReader()
         reader.onload = (event) => {
            fileURLs[i] = reader.result
            setSubImgUrl([...fileURLs])
         }
         reader.readAsDataURL(file)
      }
   }, [])

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         console.log(title)
         console.log(content)
         console.log(subContent)
         console.log(price)
         console.log(categoryId)
         console.log(titleImgFile)
         if (!title.trim() || !content.trim() || !subContent.trim() || !price || !categoryId || !titleImgUrl) {
            alert('추가 이미지를 제외한 모든 항목을 작성해 주셔야 합니다.')
            return
         }

         const formData = new FormData()
         for (let file of subImgFile) {
            formData.append('subImg', file, encodeURIComponent(file.name))
         }
         formData.append('title', title)
         formData.append('content', content)
         formData.append('subContent', subContent)
         formData.append('price', price)
         formData.append('categoryId', categoryId)
         formData.append('titleImg', titleImgFile)
         onSubmit(formData)
      },
      [title, content, subContent, price, categoryId, titleImgFile, subImgFile, onSubmit]
   )

   const subImgPreview = () => {
      return subImgUrl.map((url, index) => <img height={'200px'} width={'200px'} key={index} src={url} alt={`image-${index}`} />)
   }

   return (
      <Wrap>
         <Container>
            <p>판매글 등록</p>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} style={{ width: '400px' }}>
               <TextField label="게시물 제목" variant="outlined" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ m: 1 }} />
               <TextField label="상품상태" variant="outlined" type="textarea" name="subContent" value={subContent} onChange={(e) => setSubContent(e.target.value)} sx={{ m: 1 }} />
               <TextField multiline rows={5} label="상품소개" variant="outlined" type="textarea" name="content" value={content} onChange={(e) => setContent(e.target.value)} sx={{ m: 1 }} />
               <TextField label="가격" variant="outlined" type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ m: 1 }} />
               <FormControl style={{ width: '200px', margin: '10px auto' }}>
                  <InputLabel id="category-label" sx={{ m: 1 }}>
                     카테고리
                  </InputLabel>
                  <Select labelId="category-label" name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="카테고리" sx={{ m: 1 }}>
                     {categorys.map((ct) => (
                        <MenuItem key={ct.id} value={ct.id}>
                           {ct.categoryName}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <p>대표이미지</p>
               {titleImgUrl && <img src={titleImgUrl} alt="업로드 이미지 미리보기" style={{ width: '200px', height: '200px' }} />}
               <Button style={{ width: '200px', margin: '10px auto' }} component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  이미지 업로드
                  <VisuallyHiddenInput type="file" onChange={handleTitleImgChange} name="titleImg" />
               </Button>
               <p>추가이미지</p>
               {subImgUrl && subImgPreview()}
               <Button style={{ width: '200px', margin: '10px auto' }} component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  이미지 업로드
                  <VisuallyHiddenInput type="file" onChange={handleSubImgChange} name="subImg" multiple />
               </Button>
               <Button style={{ width: '200px', margin: '10px auto' }} variant="contained" type="submit" sx={{ mt: 2 }}>
                  등록하기
               </Button>
            </form>
         </Container>
      </Wrap>
   )
}

export default BoardReg
