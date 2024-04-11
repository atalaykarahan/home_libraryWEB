import { Children } from "react";

interface EachProps {
  render: (item: any, index: number) => React.ReactNode;
  of: any[];
}

const Each: React.FC<EachProps> = ({ render, of }) => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default Each;
