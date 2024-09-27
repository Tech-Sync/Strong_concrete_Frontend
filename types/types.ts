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
  MaterialId: number,
  quantity: number,
  unitPrice: number,
  totalPrice: number,
  FirmId: number,
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
  plateNumber: string;
  model: number;
  capacity: number;
  driver: {
    firstName: string,
    lastName: string,
    phoneNo: string
  };
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  creatorId: number;
  updaterId: number | null;
}

export interface User {
  id?: number;
  firstName: string,
  lastName: string
  nrcNo: string;
  phoneNo: string;
  address: string;
  role: number;
  email: string;
  profilePic: string | null;
  password: string;
  emailToken: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface Sale {
  id: number,
  FirmId: number | string,
  ProductId: number | string,
  quantity: number,
  unitPrice: number,
  location: string,
  otherCharges: number,
  totalPrice: number,
  discount: number,
  requestedDate: string,
  sideContact: string,
  orderDate: Date | null,
  orderNumber: number,
  status: number,
  createdAt?: string,
  updatedAt?: string | null,
  deletedAt?: string | null,
  creatorId?: number,
  updaterId?: number | null;
  Firm?: {
    name: string
  },
  Product?: {
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
      date: string,
      tags: string
    }
  ]
}

export interface Production {
  id: number,
  SaleId: number | null,
  VehicleIds: Array<Vehicle> | [],
  status: number,
  createdAt: string,
  updatedAt: string | null,
  deletedAt: null,
  creatorId: number,
  updaterId: null,
  Sale: {
    id: number,
    quantity: number,
    FirmId: number,
    orderDate: string,
    Product: {
      id: number,
      name: string
    }
  }
}

export interface Vehicle {
  DriverId: number,
  id: number,
  plateNumber: string,
  model: number,
  capacity: number,
  status: number,
  driver: {
    firstName: string,
    lastName: string,
    phoneNo: string
  }
}

/* DELIVERY */
export interface Delivery {
  id: number;
  status: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | number | null;
  VehicleId: number;
  creatorId: number | null;
  updaterId: null;
  ProductionId: number;
  Vehicle: DeliveryVehicle;
  Production: DeliveryProduction;
}

export interface DeliveryProduction {
  id: number;
  Sale: DeliverySale;
}

export interface DeliverySale {
  id: number;
  location: string;
  sideContact: string;
  orderDate: Date | null;
  Product: DeliveryProduct;
}

export interface DeliveryProduct {
  id: number;
  name: string;
}

export interface DeliveryVehicle {
  id: number;
  plateNumber: string;
  status: number;
  driver: Driver;
}

export interface Driver {
  firstName: string;
  lastName: string;
}

export interface Stats {
  sale: {
    totalSale: number;
    totalSaleLastWeek: number;
    salePerChange: number;
    SaleCount: number;
  };
  purchase: {
    totalPurchase: number;
    totalPurchaseLastWeek: number;
    purchasePercChange: number;
    purchaseCount: number;
  };
  profit: {
    totalProfit: number;
    totalProfitLastWeek: number;
    profitPercentageChange: number;
  };
}

export interface RevenueChart {
  monthlySales: number[];
  monthlyPurchases: number[];
}

export interface SalesByCategory {
  productName: string[] | 0;
  productQuantity: number[] | 0;
}


export interface DashboardData {
  stats: Stats;
  revenueChart: RevenueChart;
  salesByCategory: SalesByCategory;
}

/* EMAIL START */
export interface Email {
  "@odata.etag": string;
  id: string;
  type: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  changeKey: string;
  categories: string[];
  receivedDateTime: string;
  sentDateTime: string;
  hasAttachments: boolean;
  internetMessageId: string;
  subject: string;
  bodyPreview: string;
  importance: string;
  parentFolderId: string;
  conversationId: string;
  conversationIndex: string;
  isDeliveryReceiptRequested: boolean;
  isReadReceiptRequested: boolean;
  isRead: boolean;
  isDraft: boolean;
  webLink: string;
  inferenceClassification: string;
  body: Body;
  sender: Sender;
  from: From;
  toRecipients: ToRecipient[];
  ccRecipients: any[];
  bccRecipients: any[];
  replyTo: any[];
  flag: Flag;
}

interface Flag {
  flagStatus: string;
}

export interface ToRecipient {
  emailAddress: {
    name: string;
    address: string;
  };
}


interface From {
  emailAddress: EmailAddress1;
}

interface EmailAddress1 {
  name: string;
  address: string;
}

interface Sender {
  emailAddress: EmailAddress;
}

interface EmailAddress {
  name: string;
  address: string;
}

interface Body {
  contentType: string;
  content: string;
}

export interface Folder {
  id: string,
  displayName: string,
  parentFolderId: string,
  childFolderCount: number,
  unreadItemCount: number,
  totalItemCount: number,
  isHidden: boolean
}
/* EMAIL ENDS */

/* CHAT START */


export interface Chat {
  id: number;
  latestMessageId: null | number;
  chatName: string | null;
  chatPicture: string | null;
  isGroupChat: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  groupAdminId: number | null;
  chatUsers: GroupAdmin[];
  latestMessage: null | LatestMessage;
  groupAdmin: GroupAdmin | null;
}

export interface GroupAdmin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  phoneNo: string;
  role: number;
}


export interface LatestMessage {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  chatId: number;
  senderId: number;
}

export interface Message {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  chatId: number;
  senderId: number;
}


