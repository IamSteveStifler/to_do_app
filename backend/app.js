const express = require('express');
const app = express();
const userRouter = require('./routes/usersRoutes');
const taskRouter = require('./routes/tasksRoutes');



app.use(express.json());
app.use('/users',userRouter);
app.use('/tasks',taskRouter);

module.exports = app;