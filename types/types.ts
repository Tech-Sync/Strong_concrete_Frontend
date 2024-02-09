
export interface Login  {
    email: string,
    password: string
}

export interface Register  {
    name: string,
    email: string,
    password: string
}

export interface Purchase {
    id: number,
    MaterialId : number,
    quantity: number,
    unitPrice: number,
    totalPrice: number,
    FirmId:number,
    creatorId: number | null,
    updatorId: number | null
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
    

    
  

}
export interface Purchases {
    purchases: Purchase[]
}
