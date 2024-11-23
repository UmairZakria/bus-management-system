// import nc from 'next-connect'; // For middleware handling
// import upload from '@/lib/multer-config';

// // Initialize middleware handler
// const handler = nc({
//   onError: (err, req, res, next) => {
//     res.status(500).end(err.toString());
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).send('Route not found');
//   },
// });

// // Add multer middleware
// handler.use(upload.single('file')); // For single file upload

// // Handle POST request
// handler.post((req, res) => {
//   res.status(200).json({
//     message: 'File uploaded successfully',
//     file: req.file,
//   });
// });

// export default handler;

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing for file uploads
//   },
// };
