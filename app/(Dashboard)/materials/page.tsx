import { getMaterials } from "@/actions/materials/getMaterials"

import MaterialsTable from "./materialsTable";
const MaterialsPage = async () => {
  const materials = await getMaterials();
  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="invoice-table">
      
      <MaterialsTable materials={materials} />
    </div>
    </div>
  )
}

export default MaterialsPage