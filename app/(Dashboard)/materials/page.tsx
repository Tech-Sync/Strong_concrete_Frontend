import { getMaterials } from "@/actions/materials/getMaterials"

const MaterialsPage = async () => {
  const materials = await getMaterials();
  console.log("materials", materials)

  if (materials) {
    return (
      <div>
        {JSON.stringify(materials)}
      </div>
    )
  }
  return (
    <div>MaterialsPage</div>
  )
}

export default MaterialsPage