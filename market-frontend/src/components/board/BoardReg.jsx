import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useState, useCallback, useMemo, useEffect } from 'react'

const BoardReg = ({ onSubmit, initialValues = {} }) => {
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
      <>
         <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
            <p>판매 게시물 제목</p>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <p>상품상태</p>
            <input type="textarea" name="subContent" value={subContent} onChange={(e) => setSubContent(e.target.value)} />
            <p>상품소개</p>
            <input type="textarea" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
            <p>가격</p>
            <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <p>카테고리</p>
            <select name="categoryId" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
               <option value="1">가전제품</option>
               <option value="2">의류</option>
            </select>
            <p>대표이미지</p>
            <input type="file" name="titleImg" onChange={handleTitleImgChange} />
            {titleImgUrl && <img src={titleImgUrl} alt="업로드 이미지 미리보기" style={{ width: '150px', height: '150px' }} />}
            <p>추가이미지</p>
            <input type="file" name="subImg" onChange={handleSubImgChange} multiple />
            {subImgUrl && subImgPreview()}
            <button type="submit">등록하기</button>
         </form>
      </>
   )
}

export default BoardReg
