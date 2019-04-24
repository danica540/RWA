import { LibraryBranchesComponent } from "../components/library-branches-component";
import { MainComponent } from "../components/main-component";
import { LibraryCatalogComponent } from "../components/library-catalog-component";
import { PatronsComponent } from "../components/patrons-component";

export class Router {
    constructor() {
    }

    navigateToPage(val) {
        switch (val) {
            case 1: {
                this.navigateToLibraryCatalog();
                return;
            }
            case 2: {
                this.navigateToLibraryPatrons();
                return;
            }
            case 3: {
                this.navigateToLibraryBranches();
                return;
            }
            case 4: {
                this.navigateToMainView();
                return;
            }
        }
    }

    navigateToLibraryCatalog() {
        let catalogLibrary = new LibraryCatalogComponent();
        catalogLibrary.drawLibraryCatalog();
    }

    navigateToLibraryPatrons() {
        let patronView=new PatronsComponent();
        patronView.drawPatronList();
    }

    navigateToLibraryBranches() {
        let branchComponent = new LibraryBranchesComponent();
        branchComponent.drawDefaultView();
    }

    navigateToMainView() {
        let mainComponent = new MainComponent();
        mainComponent.drawMainView();
    }
}