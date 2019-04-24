import { from } from "rxjs";
export class MainViewService {
    constructor() {
    }

    getMainViewItems() {
        return from(
            fetch("http://localhost:3000/main_view/")
                .then(res => { return res.json() })
        )
    }

    getMainViewItemsPromise(){
        return new Promise((resolve,reject)=>{
            const randomNumber=Math.random()*100;
            setTimeout(()=>resolve(fetch("http://localhost:3000/main_view/")),randomNumber); 
        })
    }

}