import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IUserMenu {
    ID: number;
    DisplayText: string;
    DisplayTextShort: string;
    MenuPosition: MenuPosition;
    CssClass: IconProp;
    Url: string;
    ParentMenuID: number | null;
    SortOrder: number;
    UniqueId: string;
    Weboc_Left_Menu_ID?: number;
    Weboc_Navigation_Control_Type_ID?: number;

    SubMenus?: IUserMenu[];

    DisplayInTree: boolean;
    PinnedByUser: boolean;
    IsAlreadyPinned: boolean;
}

export enum MenuPosition {
    Left = "L",
    Right = "R",
    Center = "C",
    Bottom = "B",
    Header = "H"
}

export interface IError {
    error: string;
    status: number;
}
