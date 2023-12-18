const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const bookController = require('../controllers/bookController');
const genreController = require('../controllers/genreController');
const commentController = require('../controllers/commentController');
const readController = require('../controllers/readController');
const authenticateJWT = require('../middleware/authMiddleware');

/**
* @swagger
* /api/users/getAll:
*   get:
*     summary: Get all users
*     responses:
*       200:
*         description: Successful response with the list of users
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 users:
*                   type: array
*                   items:
*                     $ref: '#/src/models/userModel'
*/
router.get('/users/getAll', authenticateJWT, userController.getAllUsers);

/**
* @swagger
* /api/users/get/{id}:
*   get:
*     summary: Get a user by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the user to retrieve
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successful response with the user details
*         content:
*           application/json:
*             schema:
*               $ref: '#/src/models/userModel'
*       404:
*         description: User not found
*/
router.get('/users/get/:id', authenticateJWT, userController.getUserById);

/**
* @swagger
* /api/users/update:
*   put:
*     summary: Update a user's username and password
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 description: The new username for the user
*                 example: new_john_doe
*               password:
*                 type: string
*                 description: The new password for the user
*                 example: new_secret123
*     responses:
*       200:
*         description: Successful response with the updated user details
*         content:
*           application/json:
*             schema:
*               $ref: '#/src/models/userModel'
*       401:
*         description: Unauthorized - Missing or invalid JWT token
*       404:
*         description: User not found
*/
router.put('/users/update', authenticateJWT, userController.updateUserById);

/**
* @swagger
* /api/users/delete/{id}:
*   delete:
*     summary: Delete a user by ID
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the user to delete
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successful response with the deleted user details
*         content:
*           application/json:
*             schema:
*               $ref: '#/src/models/userModel'
*       401:
*         description: Unauthorized - Missing or invalid JWT token
*       404:
*         description: User not found
*/
router.post('/users/delete/:id', authenticateJWT, userController.deleteUserById);


/**
* @swagger
* /api/auth/register:
*   post:
*     summary: Register a new user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 description: The username for the new user
*                 example: john_doe
*               password:
*                 type: string
*                 description: The password for the new user
*                 example: secret123
*               profileData:
*                 type: object
*                 description: The profile data for the new user
*                 properties:
*                   name:
*                     type: string
*                     example: John Doe
*                   gender:
*                     type: string
*                     example: Male
*                   age:
*                     type: number
*                     example: 30
*     responses:
*       201:
*         description: User registered successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: User registered successfully
*                 user:
*                   $ref: '#/src/models/userModel'
*       400:
*         description: Bad request - Invalid input or username already exists
*/
router.post('/auth/register', authenticateJWT, authController.register);

/**
* @swagger
* /api/auth/login:
*   post:
*     summary: Log in with existing user credentials
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 description: The username of the user
*                 example: john_doe
*               password:
*                 type: string
*                 description: The password of the user
*                 example: secret123
*     responses:
*       200:
*         description: User logged in successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: User logged in successfully
*                 token:
*                   type: string
*                   example: eyJhbGciOiJIUzI1NiIsIn...
*       401:
*         description: Unauthorized - Invalid credentials
*/
router.post('/auth/login', authenticateJWT, authController.login);

/**
* @swagger
* /api/auth/change-password:
*   post:
*     summary: Change user password
*       security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               oldPassword:
*                 type: string
*                 description: The current password of the user
*                 example: current_password
*               newPassword:
*                 type: string
*                 description: The new password for the user
*                 example: new_password
*     responses:
*       200:
*         description: Password changed successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Password changed successfully
*       401:
*         description: Unauthorized - Missing or invalid JWT token
*       400:
*         description: Bad request - Invalid input or old password is incorrect
*/
router.post('/auth/change-password', authenticateJWT, authController.changePassword);


/**
 * @swagger
 * /api/profiles/create:
 *   post:
 *     summary: Create a new user profile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               gender:
 *                 type: string
 *                 description: The gender of the user
 *                 example: Male
 *               age:
 *                 type: number
 *                 description: The age of the user
 *                 example: 30
 *     responses:
 *       201:
 *         description: User profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile created successfully
 *                 profile:
 *                   $ref: '#/src/models/userModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       400:
 *         description: Bad request - Invalid input
 */
router.post('/profiles/create', authenticateJWT, profileController.createProfile);

/**
 * @swagger
 * /api/profiles/getAll:
 *   get:
 *     summary: Get all user profiles
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profiles:
 *                   type: array
 *                   items:
 *                     $ref: '#/src/models/profileModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 */
router.get('/profiles/getAll', authenticateJWT, profileController.getAllProfiles);

/**
 * @swagger
 * /api/profiles/get/{id}:
 *   get:
 *     summary: Get a user profile by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the profile to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/profileModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Profile not found
 */
router.get('/profiles/get/:id', authenticateJWT, profileController.getProfileById);

/**
 * @swagger
 * /api/profiles/update/{id}:
 *   put:
 *     summary: Update a user profile by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the profile to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the user
 *                 example: New John Doe
 *               gender:
 *                 type: string
 *                 description: The new gender of the user
 *                 example: Female
 *               age:
 *                 type: number
 *                 description: The new age of the user
 *                 example: 35
 *     responses:
 *       200:
 *         description: Successful response with the updated profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/profileModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Profile not found
*/
router.put('/profiles/update/:id', authenticateJWT, profileController.updateProfileById);

/**
 * @swagger
 * /api/profiles/delete/{id}:
 *   delete:
 *     summary: Delete a user profile by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the profile to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the deleted profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/profileModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Profile not found
*/
router.delete('/profiles/delete/:id', authenticateJWT, profileController.deleteProfileById);


/**
 * @swagger
 * /api/books/create:
 *   post:
 *     summary: Create a new book
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *                 example: The Great Gatsby
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: F. Scott Fitzgerald
 *               description:
 *                 type: string
 *                 description: The description of the book
 *                 example: A classic novel set in the Jazz Age
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: Drama
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book created successfully
 *                 book:
 *                   $ref: '#/src/models/bookModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       400:
 *         description: Bad request - Invalid input or title already exists
*/
router.post('/books/create', authenticateJWT, bookController.createBook);

/**
 * @swagger
 * /api/books/getAll:
 *   get:
 *     summary: Get all books
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/src/models/bookModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
*/
router.get('/books/getAll', authenticateJWT, bookController.getAllBooks);

/**
 * @swagger
 * /api/books/get/{id}:
 *   get:
 *     summary: Get a book by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/bookModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Book not found
*/
router.get('/books/get/:id', authenticateJWT, bookController.getBookById);

/**
 * @swagger
 * /api/books/update/{id}:
 *   put:
 *     summary: Update a book by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the book
 *                 example: New Title
 *               author:
 *                 type: string
 *                 description: The new author of the book
 *                 example: New Author
 *               description:
 *                 type: string
 *                 description: The new description of the book
 *                 example: Updated description
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: Fiction
 *     responses:
 *       200:
 *         description: Successful response with the updated book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/bookModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Book not found
*/
router.put('/books/update/:id', authenticateJWT, bookController.updateBookById);

/**
 * @swagger
 * /api/books/delete/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the deleted book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/bookModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Book not found
*/
router.delete('/books/delete/:id', authenticateJWT, bookController.deleteBookById);


/**
 * @swagger
 * /api/genres/create:
 *   post:
 *     summary: Create a new genre
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the genre
 *                 example: Fiction
 *     responses:
 *       201:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Genre created successfully
 *                 genre:
 *                   $ref: '#/src/models/genreModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       400:
 *         description: Bad request - Invalid input or name already exists
*/
router.post('/genres/create', authenticateJWT, genreController.createGenre);

/**
 * @swagger
 * /api/genres/getAll:
 *   get:
 *     summary: Get all genres
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genres:
 *                   type: array
 *                   items:
 *                     $ref: '#/src/models/genreModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
*/
router.get('/genres/getAll', authenticateJWT, genreController.getAllGenres);

/**
 * @swagger
 * /api/genres/get/{id}:
 *   get:
 *     summary: Get a genre by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the genre details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/genreModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Genre not found
*/
router.get('/genres/get/:id', authenticateJWT, genreController.getGenreById);

/**
 * @swagger
 * /api/genres/update/{id}:
 *   put:
 *     summary: Update a genre by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the genre
 *                 example: New Fiction
 *     responses:
 *       200:
 *         description: Successful response with the updated genre details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/genreModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Genre not found
*/
router.put('/genres/update/:id', authenticateJWT, genreController.updateGenreById);

/**
 * @swagger
 * /api/genres/delete/{id}:
 *   delete:
 *     summary: Delete a genre by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the deleted genre details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/src/models/genreModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       404:
 *         description: Genre not found
*/
router.delete('/genres/delete/:id', authenticateJWT, genreController.deleteGenreById);


/**
 * @swagger
 * /api/comments/create:
 *   post:
 *     summary: Create a new comment
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *                 example: This book is amazing!
 *               bookId:
 *                 type: string
 *                 description: The ID of the book for the comment
 *                 example: 5ff1e8de72f81872b8875936
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment created successfully
 *                 comment:
 *                   $ref: '#/src/models/commentModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       400:
 *         description: Bad request - Invalid input or book not found
*/
router.post('/comments/create', authenticateJWT, commentController.createComment);

/**
 * @swagger
 * /api/comments/getAll:
 *   get:
 *     summary: Get all comments
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/src/models/commentModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
*/
router.get('/comments/getAll', authenticateJWT, commentController.getAllComments);


/**
 * @swagger
 * /api/reads/start:
 *   post:
 *     summary: Start reading a book
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: The ID of the book to start reading
 *                 example: 5ff1e8de72f81872b8875936
 *     responses:
 *       201:
 *         description: Reading started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reading started successfully
 *                 read:
 *                   $ref: '#/src/models/readModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       400:
 *         description: Bad request - Invalid input or book not found
*/
router.post('/reads/start', authenticateJWT, readController.startReading);

/**
 * @swagger
 * /api/reads/finish:
 *   post:
 *     summary: Finish reading a book
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: The ID of the book to finish reading
 *                 example: 5ff1e8de72f81872b8875936
 *     responses:
 *       201:
 *         description: Reading finished successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reading finished successfully
 *                 read:
 *                   $ref: '#/src/models/readModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       400:
 *         description: Bad request - Invalid input or book not found
*/
router.post('/reads/finish', authenticateJWT, readController.finishReading);

/**
 * @swagger
 * /api/reads/getAll:
 *   get:
 *     summary: Get all reading records
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of reading records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reads:
 *                   type: array
 *                   items:
 *                     $ref: '#/src/models/readModel'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
*/
router.get('/reads/getAll', authenticateJWT, readController.getAllReadActivities);

module.exports = router;
