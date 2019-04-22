import { BranchService } from "../services/branch-service";
import { map, flatMap } from "rxjs/operators";
import { zip } from 'rxjs';
import { MainModule } from "../modules/main-module";

const module=new MainModule();
module.mainView();

let service = new BranchService();
let branches$ = service.getBranches().pipe(
    flatMap(item => item)
);

let weekHours$ = service.getWeekHours().pipe(
    flatMap(item => item)
);

zip(weekHours$, branches$).pipe(
    map(([week, branch]) => ({ week, branch }))
).subscribe(x => console.log(x));
