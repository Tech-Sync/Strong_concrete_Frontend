import Link from "next/link";
import AccountsTable from './../../components/accounts/AccountsTable';

const PurchaseAccountsPage = async () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Purchase Accounts</span>
        </li>
      </ul>
      <AccountsTable  />
    </div>
  );
};

export default PurchaseAccountsPage;
