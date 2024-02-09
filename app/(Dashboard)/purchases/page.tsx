import { getPurchases } from "@/actions/purchases/getPurchases"
import PurchasesTable from "./PurchasesTable";

const PurchasesPage = async () => {
  const purchases = await getPurchases();
  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="invoice-table">
      
      <PurchasesTable purchases={purchases} />
    </div>
    </div>
  )
}

export default PurchasesPage