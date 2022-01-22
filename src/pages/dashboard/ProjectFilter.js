const filterList = ["all", "mine", "development", "design", "marketing", "sales"]

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }
  return (
    <div className="project-filter">
      <nav>
        <p> Filter by: </p>
        {filterList.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className={currentFilter === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProjectFilter
