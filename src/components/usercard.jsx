
const Usercard = ({user})=>{
   const {FirstName,LastName,Age,Gender}= user
     return(<div><div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{user.FirstName}</h2>
    <p>{user.Age}</p>
    
    <p>default quote </p>
    <div className="card-actions">
      <button className="btn btn-primary">ignore</button>
      <button className="btn btn-primary">intreasted</button>
    </div>
  </div>
</div></div>)
}
export default Usercard