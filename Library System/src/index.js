import { MainModule } from "../modules/main-module";
import { BookService } from "../services/book-service";
import { MainViewService } from "../services/main-view-service";
import { map, flatMap, reduce } from "rxjs/operators";
import { PatronService } from "../services/patron-services";
import { BranchService } from "../services/branch-service";

const module = new MainModule();
module.mainView();

// let bookService = new BookService();
// let book = {
//     "id": "51",
//     "author": "Paulo Coelho222",
//     "genre": "novel",
//     "title": "Alchemist",
//     "img": "../resources/alchemist.jpg",
//     "library_id": 1,
//     "value": 2040000.36
// };

// bookService.changeBookTitle(book).subscribe(x=>console.log(x));
// console.log(window.history);

// let servis = new MainViewService();
// servis.getMainViewItemsPromise()
// .then(res=>{return res.json()})
// .then(movies=>console.log(movies));

//history.forward();
history.replaceState("main", null, "index.html");
//history.go(3);
let _service=new PatronService();
let branchService=new BranchService();
let promise1=_service.getAllPatronsPromise().then(res=>{return res.json()});
let promise2=branchService.getBranchesPromise().then(res=>{return res.json()});

Promise.all([promise1, promise2])
.then((values)=> {
    console.log(values);
  });
