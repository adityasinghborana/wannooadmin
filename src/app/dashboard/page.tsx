import Card from "../ui/dashboard/card/Card";

const Dashboard = () => {
  return (
    <div className="mt-5">
      <div className="">
        <div className="hidden md:grid grid-cols-3 gap-5">
          <Card title="Total Users" value={1200} desc="......" />
          <Card title="Total Vendors" value={1200} desc="......"/>
          <Card title="Total Tours" value={1200} desc="......"/>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
