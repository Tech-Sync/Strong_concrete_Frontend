export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}
// {
//     "id": 1,
//     "name": "MATERIALNAME",
//     "unitType": "Testtype",
//     "quantity": 0,
//     "createdAt": "2024-02-05T16:55:32.010Z",
//     "updatedAt": "2024-02-05T16:55:32.010Z",
//     "deletedAt": null,
//     "creatorId": null,
//     "updaterId": null
// },
export interface Material {
  id: number;
  name: string;
  unitType: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  creatorId: number | null;
  updaterId: number | null;
}

export interface Firm {
  id: number;
  name: string;
  address: string;
  email: string;
  phoneNo: string;
  status: number;
  tpinNo: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  creatorId: number | null;
  updaterId: number | null;
}
export interface Materials {
  materials: Material[];
}

export interface Purchase {
  id: number,
  MaterialId : number,
  quantity: number,
  unitPrice: number,
  totalPrice: number,
  FirmId:number,
  createdAt: string,
  updatedAt: string,
  creatorId: number | null,
  updatorId: number | null
  deletedAt: string | null,
}