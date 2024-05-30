import express from 'express'
import { generatePdf } from '../controllers/pdfController'
import validateToken from '../middleware/validateToken'
let router=express.Router()

router.post('/generate-pdf',validateToken,generatePdf)


export default router