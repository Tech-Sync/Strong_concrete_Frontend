export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

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
  Material: {
    name: string | null,
    unitType: string | null,
  },
  Firm: {
    name: string | null,
    address: string | null,
    phoneNo: string | null,
    email: string | null
  },
  creatorId: number | null,
  updatorId: number | null
  deletedAt: string | null,
}
export interface PurchaseAccount {
  id: number,
  PurchaseId: number,
  Purchase: {
    FirmId: number,
    Material:{name: string | null},
    MaterialId: number,
    createdAt: string,
    creatorId: number | null,
    deletedAt: string | null,
    id: number,
    quantity: number,
    totalPrice: number,
    unitPrice: number,
    updatedAt: string | null,
    updatorId: number | null
 },
  debit: number,
  credit: number,
  balance: number,
  FirmId:number,
  Firm:{name:string | null},
  createdAt: string,
  updatedAt: string,
  creatorId: number | null,
  updaterId: number | null
  deletedAt: string | null,
}


export interface Product {
  id: number;
  name: string;
  price: number;
  materials: {
    STONE: number;
    SAND: number;
    CEMENT: number;
  };
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  creatorId: number;
  updaterId: number | null;
}
