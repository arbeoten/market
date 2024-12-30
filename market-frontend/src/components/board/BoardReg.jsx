import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Wrap, Container } from '../../styles/input'
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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

   const [title, setTitle] = useState(initialValues.title || '')
   const [content, setContent] = useState(initialValues.content || '')
   const [subContent, setSubContent] = useState(initialValues.subContent || '')
   const [price, setPrice] = useState(initialValues.price || '')
   const [categoryId, setCategoryId] = useState(initialValues.categoryId || 1)

   const [titleImgFile, setTitleImgFile] = useState(null)
   const [titleImgUrl, setTitleImgUrl] = useState(initialValues.titleImg ? process.env.REACT_APP_API_URL + initialValues.titleImg : '') // 이미지 경로

   const [subImgFile, setSubImgFile] = useState([])
   const [subImgUrl, setSubImgUrl] = useState(initialValues.subImg ? process.env.REACT_APP_API_URL + initialValues.subImg : '') // 이미지 경로

   useEffect(() => {
      if (initialValues.Images) {
         console.log('iv.images:', initialValues.Images)
         const titleImg = initialValues.Images.find((img) => img.isTitle == true)
         setTitleImgUrl(process.env.REACT_APP_API_URL + titleImg.img)
         const subimgs = initialValues.Images.filter((img) => img.isTitle == false)
         const subImgUrls = subimgs.map((img) => process.env.REACT_APP_API_URL + img.img)
         setSubImgUrl(subImgUrls)
         console.log('subimgs:', subimgs)
         console.log('subimgurl:', subImgUrls)
      }
   }, [])

   const handleTitleImgChange = useCallback(
      (e) => {
         const file = e.target.files && e.target.files[0]
         if (!file) return

         setTitleImgFile(file)

         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = (event) => {
            setTitleImgUrl(event.target.result)
         }
      },
      [titleImgFile]
   )

   const handleSubImgChange = useCallback(
      (e) => {
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
      },
      [subImgFile]
   )

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         const formData = new FormData() // 폼 데이터를 쉽게 생성하고 전송할 수 있도록 하는 객체
         for (let file of subImgFile) {
            formData.append('subImg', file, encodeURIComponent(file.name))
         }
         formData.append('title', title)
         formData.append('content', content)
         formData.append('subContent', subContent)
         formData.append('price', price)
         formData.append('categoryId', categoryId)

         formData.append('titleImg', titleImgFile)
         onSubmit(formData) // formData 객체 전송
      },
      [title, content, subContent, price, categoryId, titleImgFile, subImgFile, onSubmit]
   )
   // 등록/수정 버튼
   const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

   const subImgPreview = () => {
      return subImgUrl.map((url, index) => <img height={'150px'} width={'150px'} key={index} src={url} alt={`image-${index}`} />)
   }

   return (
      <Wrap>
         <Container>
            <p>판매글 등록</p>
            <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
               <TextField label="게시물 제목" variant="outlined" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ m: 1 }} />
               <TextField label="상품상태" variant="outlined" type="textarea" name="subContent" value={subContent} onChange={(e) => setSubContent(e.target.value)} sx={{ m: 1 }} />
               <TextField label="상품소개" variant="outlined" type="textarea" name="content" value={content} onChange={(e) => setContent(e.target.value)} sx={{ m: 1 }} />
               <TextField label="가격" variant="outlined" type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ m: 1 }} />
               <FormControl fullWidth>
                  <InputLabel id="category-label" sx={{ m: 1 }}>
                     카테고리
                  </InputLabel>
                  <Select labelId="category-label" name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="카테고리" sx={{ m: 1 }}>
                     <MenuItem value="1">가전제품</MenuItem>
                     <MenuItem value="2">의류</MenuItem>
                  </Select>
                  <FormHelperText>카테고리를 선택하세요</FormHelperText>
               </FormControl>
               <p>대표이미지</p>
               {titleImgUrl && <img src={titleImgUrl} alt="업로드 이미지 미리보기" style={{ width: '150px', height: '150px' }} />}
               <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  이미지 업로드
                  <VisuallyHiddenInput type="file" onChange={handleTitleImgChange} name="titleImg" />
               </Button>
               <p>추가이미지</p>
               {subImgUrl && subImgPreview()}
               <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  이미지 업로드
                  <VisuallyHiddenInput type="file" onChange={handleSubImgChange} name="subImg" multiple />
               </Button>
               <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                  등록하기
               </Button>
            </form>
         </Container>
      </Wrap>
   )
}

export default BoardReg
