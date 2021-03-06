/* eslint-disable no-console */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';

const NUM_SECTIONS = 20;
const NUM_ROWS_PER_SECTION = 10;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    for (let ii = 0; ii < NUM_SECTIONS; ii++) {
      const sectionName = String.fromCharCode(65 + ii);
      sectionIDs.push(sectionName);
      dataBlob[sectionName] = sectionName;
      rowIDs[ii] = [];

      for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        const rowName = `S${ii}, R${jj}`;
        rowIDs[ii].push(rowName);
        dataBlob[rowName] = rowName;
      }
    }
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      headerPressCount: 0,
    };
  }

  render() {
    return (<div>
      <ListView.IndexedList
        ref="lv"
        dataSource={this.state.dataSource}
        renderHeader={() => <span style={{ padding: 10 }}>header</span>}
        renderFooter={() => <span style={{ padding: 10 }}>footer</span>}
        renderSectionHeader={(sectionData) => (
          <div style={{ color: 'blue', padding: 10, backgroundColor: '#ddd' }}>
            {sectionData}
          </div>
        )}
        renderRow={(rowData) => (<div style={{ padding: 10 }}>Hello: {rowData}</div>)}
        stickyHeader
        stickyProps={{
          stickyStyle: { zIndex: 999 },
          topOffset: -83,
          // isActive: false,
        }}
        quickSearchBarStyle={{
          top: 20,
        }}
        onQuickSearch={(sectionID) => console.log(sectionID) }
        sectionBodyClassName="sb"
      />
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
