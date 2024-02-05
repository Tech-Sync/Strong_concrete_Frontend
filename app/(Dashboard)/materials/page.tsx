import { getMaterials } from "@/actions/materials/getMaterials"

import MaterialsTable from "./materialsTable";
const MaterialsPage = async () => {
  const materials = await getMaterials();
  console.log("materials", materials)


  return (
    <div>
      <div>
        materials</div>
      <MaterialsTable materials={materials} />
    </div>
  )
}

export default MaterialsPage