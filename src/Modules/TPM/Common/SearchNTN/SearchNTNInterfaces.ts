export interface ISearchNTN {
    ntn?: string;
    companyName?: string;
    status?: string;
    isExpired?:string
}

export interface IProps {
    func: any;
    onClickClosed?: any;
    onSelect?: any;
    traderOrganizations: []
}
