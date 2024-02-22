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
  Material: string | null,
  Firm: string | null,
  creatorId: number | null,
  updatorId: number | null
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
