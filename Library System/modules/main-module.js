import { MainComponent } from "../components/main-component";
import { NavBarComponent } from "../components/nav-bar-component";
import { LibraryBranchesComponent } from "../components/library-branches-component";
export class MainModule {
    constructor() {

    }
    mainView() {
        const nav = new NavBarComponent();
        nav.onInit();
        const main = new MainComponent();
        main.drawMainView();
        // main.show();
        // const libraryBranch=new LibraryBranches();
        // libraryBranch.hide();
    }
}