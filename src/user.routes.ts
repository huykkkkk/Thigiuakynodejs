// import express from 'express'
// const userRouter = express.Router()
import {Router} from 'express'
const userRouter = Router()

userRouter.use(
    (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
   //res.status(400).send('Not allowed')
   // console.log(123123)
},
(req, res, next) => {
    console.log('Time 2: ', Date.now())
    next()
}
)

userRouter.get('/tweets', (req,res) => {
    res.json({
        data: [
            {
                id: 1,
                text: 'hello world'
            }
        ]
    })
})

export default userRouter