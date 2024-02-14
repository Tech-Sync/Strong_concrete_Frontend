import MaterialsTable from "@/app/components/materials/materialsTable";
import Link from "next/link";
const MaterialsPage = async () => {
  return (
    <div className="flex flex-col space-y-5">
      <ul className="flex space-x-2 rtl:space-x-reverse ">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Materials</span>
        </li>
      </ul>
      <MaterialsTable />
    </div>
  )
}

export default MaterialsPage