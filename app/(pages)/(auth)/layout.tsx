const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#9dc2ff] to-[#334055] absolute">
      {children}
    </div>
  );
};

export default AuthLayout;
