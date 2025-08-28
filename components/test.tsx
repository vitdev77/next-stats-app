interface IProps {
  records: {
    id: string;
    date: string;
    balance: string;
  }[];
}

// const TestComponent: React.FC<IProps> = ({ records }) => {
//   return (
//     <ul>
//       {records.map((record) => (
//         <li key={record.id} className="flex flex-row items-center border-b">
//           <div className="w-[150px] border-r px-2 font-bold">{record.id}</div>
//           <div className="w-[250px] border-r px-2">{record.date}</div>
//           <div className="px-2">
//             <span className="font-light text-muted-foreground">$</span>{" "}
//             {record.balance}
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };
// export default TestComponent;

export default function TestComponent({ records }: IProps) {
  return (
    <ul>
      {records.map((record) => (
        <li key={record.id} className="flex flex-row items-center border-b">
          <div className="w-[150px] border-r px-2 font-bold">{record.id}</div>
          <div className="w-[250px] border-r px-2">{record.date}</div>
          <div className="px-2">
            <span className="font-light text-muted-foreground">$</span>{" "}
            {record.balance}
          </div>
        </li>
      ))}
    </ul>
  );
}
