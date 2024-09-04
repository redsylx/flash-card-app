import Header from "../../components/Header";

export default () => {
  return(
    <div>
      <Header />
      <div className="custom-page">
        <div className="my-4 flex justify-between">
        </div>
        <hr className="border-t-2 border-sub" />
        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          </div>
        </div>
      </div>
    </div>
  )
}