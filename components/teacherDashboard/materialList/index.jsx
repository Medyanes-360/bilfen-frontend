import MaterialCard from "../materialCard";

const MaterialList = ({ materials }) => {
  if (materials.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>Materyaller bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
    {materials?.data?.map((material) => {
      return <MaterialCard key={material.id} material={material} />;
    })}
  </div>
  
  );
};

export default MaterialList;
