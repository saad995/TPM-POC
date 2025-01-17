import React, { useState, useEffect } from 'react';
import { process } from '@progress/kendo-data-query';
import GridView from '../Elements/Basic/GridView/GridView';
import Column from '../Elements/Basic/GridView/Columns/Column';
import CammandCell from '../Elements/Basic/GridView/Columns/CammandCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface BankAccount {
  id: number;
  bankName: string;
  accountTitle: string;
  iban: string;
  dateOfChange: string;
}

// Mock data
const mockData: BankAccount[] = [
  {
    id: 1,
    bankName: "Meezan Bank Ltd",
    accountTitle: "KHAWAJA SPINNING MILLS",
    iban: "01006932567453",
    dateOfChange: "24-05-2024"
  },
  {
    id: 2,
    bankName: "Habib Bank Ltd",
    accountTitle: "MS KHAWAJA TEXTILE MILLS",
    iban: "01586227160099",
    dateOfChange: "27-05-2024"
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 3,
    bankName: `Bank ${i + 3}`,
    accountTitle: `Account ${i + 3}`,
    iban: `IBAN${(i + 3).toString().padStart(11, '0')}`,
    dateOfChange: "28-05-2024"
  }))
];

const BankAccountHistory: React.FC = () => {
  const [data, setData] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(mockData);
  }, []);

  const handleEdit = (dataItem: BankAccount) => {
    console.log('Edit bank account:', dataItem);
  };

  const handleView = (dataItem: BankAccount) => {
    console.log('View bank account:', dataItem);
  };

  const gridProperties = [
    { field: "id", title: "S.No", width: "80px" },
    { field: "bankName", title: "Bank Name" },
    { field: "accountTitle", title: "Account Title" },
    { field: "iban", title: "IBAN" },
    { field: "dateOfChange", title: "Date Of Change" }
  ];

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 text-primary">Bank Account Details - History</h2>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {/* Add new bank account */}}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Edit Bank Account Details
            </button>
          </div>

          <GridView
            data={data}
            properties={gridProperties}
            isSearchEnabled={true}
            pageable={true}
            searchableColumns={["bankName", "accountTitle", "iban", "dateOfChange"]}
            gridStyle="purpleGrid gridRound"
            takeColumn={5}
          >
            <Column field="id" title="S.No" width="80px" />
            <Column field="bankName" title="Bank Name" />
            <Column field="accountTitle" title="Account Title" />
            <Column field="iban" title="IBAN" />
            <Column field="dateOfChange" title="Date Of Change" />
            <Column
              title="Actions"
              width="120px"
              cell={(props: any) => (
                <CammandCell
                  onEdit={handleEdit}
                  onView={handleView}
                  dataItem={props.dataItem}
                />
              )}
            />
          </GridView>
        </div>
      </div>
    </div>
  );
};

export default BankAccountHistory;