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
  id?: number;
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

export interface Vehicle {
  id: number;
  status: number;
  isPublic: boolean;
  DriverId: number;
  plateNumber: number;
  model: number;
  capacity: number;
  driver: {
    firstName: string,
    lastName: string
  };
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  creatorId: number;
  updaterId: number | null;
}

export interface User {
  id: number;
  firstName: string,
  lastName: string
  nrcNo: string;
  phoneNo: string;
  address: string;
  role: number;
  email: string;
  password: string;
  emailToken: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface Sale  {
  id: number,
  FirmId: number,
  ProductId: number,
  quantity: number,
  unitPrice: number,
  location: string,
  otherCharges: number,
  totalPrice: number,
  discount: number,
  requestedDate: string,
  sideContact: string,
  orderDate: string | null,
  orderNumber: number,
  status: number,
  createdAt: string,
  updatedAt: string | null,
  deletedAt: string | null,
  creatorId: number,
  updaterId: number | null;
  Firm: {
    name: string
  },
  Product: {
    name: string
  }
}

export interface WeeklySale {
  id: number,
  title: string,
  date: string,
  orders: [
    {
      projectId: number,
      id: number,
      title: string,
      description: string,
      date:string,
      tags: string
    }
  ]
}