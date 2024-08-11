export const Appbar = () => {
  return (
    <nav className="border-b">
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-2">
        <span className="self-center text-2xl font-bold whitespace-nowrap ">
          PayTM App
        </span>
        <div className="flex items-center">
          <p className="font-semibold text-lg mr-3">Hello, User</p>
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">U</div>
          </div>
        </div>
      </div>
    </nav>
  );
};
