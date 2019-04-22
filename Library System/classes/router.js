import { LibraryBranches } from "../components/library-branches";
import { MainComponent } from "../components/main-component";
import { LibraryCatalog } from "../components/library-catalog";

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
        let catalogLibrary = new LibraryCatalog();
        catalogLibrary.drawLibraryCatalog();
    }

    navigateToLibraryPatrons() {

    }

    navigateToLibraryBranches() {
        let branchComponent = new LibraryBranches();
        branchComponent.drawDefaultView();
    }

    navigateToMainView() {
        let mainComponent = new MainComponent();
        mainComponent.drawMainView();
    }
}