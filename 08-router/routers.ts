import express, {Router, Request, Response, NextFunction} from 'express'
import path from 'path'
import fs from 'fs'
import { Iproducts } from '../00-references/utils/Iproducts';

export const router: Router = express.Router();

const __dirname = path.resolve();
const jsonPath = path.join(__dirname, './00-references/utils/data.json');
let data: Array<Iproducts> = [];

function checkById (id: number) {
    return data.find((product: Iproducts) => product.id === id);
}

function readAndParse(req: Request, res: Response, next: NextFunction) {
   let read: string = fs.readFileSync(jsonPath, {encoding: 'utf-8'});
   data = JSON.parse(read);
   next()
}

// middlewares
router.use(readAndParse);
router.use(express.json()); 
router.use(express.urlencoded({extended: true})); 


//--------------------------------------------------------------------------------
//--------------------------     REQUESTS    -------------------------------------
//--------------------------------------------------------------------------------


router.get('/', (req: Request, res: Response) => {  //  '/' says it is the same route used in main.js //! app.use('/app', router)
    let productFiltered = data.map((product: Iproducts) => {
        const {title, body}: Iproducts = product;
        return {title, body}
    })
    res.status(200).json(productFiltered)
})


router.get('/:id', (req: Request,res: Response) => { // '/:id' completes the route in main.js //! app.use('/app', router)
    const {id} = req.params;

    let productById = checkById(Number(id));

    if (!productById) {
        return res.status(404).send('this ID doesnt exists')
    }

    res.json(productById)
})


router.post('/', (req: Request, res: Response) => {

    let idExists = checkById(Number(req.body.id));
    if (idExists) {
        return res.status(400).send('id already exists')
    }

    data.push(req.body);

    fs.writeFileSync(jsonPath, JSON.stringify(data), 'utf-8');
    res.status(204). send(req.body);
})

router.put('/:id', (req: Request, res: Response) => {
    const {id} = req.params;

    let idExists = checkById(Number(id));
    if(!idExists) {
        return res.status(404).send('id doesnt exists')
    }

    let newData: Iproducts[] = data.map((product: Iproducts) => {
        if (product.id === Number(id)) {
            product = req.body
        }
        return product
    })

    fs.writeFileSync(jsonPath, JSON.stringify(newData), 'utf-8')
    res.status(204).send('complete')
})

router.delete('/:id', (req: Request, res: Response) => {
    const {id} = req.params;

    let idExists = checkById(Number(id));
    if(!idExists) {
        return res.status(404).send('id doesnt exists');
    }

    let notDeleted = data.filter (product => {
        return product.id !== Number(id)
    })

    fs.writeFileSync(jsonPath, JSON.stringify(notDeleted), 'utf-8')
    res.status(204).send('deleted')
})