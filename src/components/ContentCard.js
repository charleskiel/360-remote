import React from "react";

class ContentCard
  extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div className="">
        <div className="content">

          <div className="title">
            {this.props.video.Artist} - {this.props.video.Title}
          </div>

        </div>
        <div className="extra">
          <span>
          </span>
        </div>
      </div>
    );

  }
};

export default ContentCard
  ;



// by reference & by value
//closures
//hashtables

// function deleteRow(rowId) {
//   console.log('clicked', name);
//   return 'done';
// }

// forEach(row in rows) {
//   <button onClick={() => deleteRow(row.id)} value="Click Me" />
// }

