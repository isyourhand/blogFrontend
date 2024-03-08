import "./css/NewPostForm.css";

function NewPostFormFolder(props) {
  const _id = props._id;
  const name = props.name;
  const folders = props.folders;
  const depth = props.depth;
  const lan = props.lan;
  const getFolderIdAndName = props.getFolderIdAndName;

  const toggleFolder = (e, depth, length, i) => {
    e.stopPropagation();

    const subfolders = e.target.parentNode.children;
    // console.log(subfolders);
    // console.log(1, e.target); // 可以看到点击事件在哪个元素发生，因为e和触发元素里的e是同一个。
    // console.log(2, e.currentTarget);
    for (let i = 1; i < subfolders.length; i++) {
      subfolders[i].hidden = !subfolders[i].hidden;
    }
  };

  return (
    <section
      hidden={depth > 1}
      onClick={toggleFolder}
      onDoubleClick={(e) => {
        // console.dir(getFolderIdAndName);
        e.stopPropagation();
        getFolderIdAndName(_id, name, lan);
      }}
    >
      <div className={"options"} style={{ paddingLeft: `${depth * 20 + 5}px` }}>
        {name}
      </div>

      {folders &&
        folders.map((child, i) => {
          return (
            <NewPostFormFolder
              _id={child._id}
              key={i}
              name={child.name}
              folders={child.subfolder}
              depth={depth + 1}
              lan={lan}
              getFolderIdAndName={getFolderIdAndName}
            />
          );
        })}
    </section>
  );
}

export default NewPostFormFolder;
