// @flow

import Column from "./Column";
import { createElement, PureComponent } from "react";
import { findDOMNode } from "react-dom";
import { FixedSizeList as List } from "react-window";

import DefaultRow from "./Row";
import DefaultHeaderRow from "./HeaderRow";

export type RowEventHandler = (index: number, event: Event) => void;
type ItemGetter = ({ index: number }) => any;
type SortCallback = ({
  defaultSortDirection: "ASC" | "DESC",
  event: MouseEvent,
  sortBy: string,
  sortDirection: "ASC" | "DESC"
}) => void;

// onItemsRendered from react-window
type OnRowsRendered = ({
  overscanStartIndex: number,
  overscanStopIndex: number,
  visibleStartIndex: number,
  visibleStopIndex: number
}) => void;

// onScroll from react-window
type OnScroll = ({
  scrollDirection: ScrollDirection,
  scrollOffset: number,
  scrollUpdateWasRequested: boolean
}) => void;

type Props = {|
  children: React$ChildrenArray<React$Element<typeof Column>>,
  className?: string,
  headerClassName?: string,
  headerHeight: number,
  headerRenderer?: React$Element<any>,
  headerStyle?: Object,
  height: number,
  hideHeader?: boolean,
  itemCount: number,
  itemGetter: ItemGetter,
  onRowsRendered?: OnRowsRendered,
  onScroll?: OnScroll,
  rowClassName?: string,
  rowEvents?: { [eventName: string]: RowEventHandler },
  rowHeight: number,
  rowRenderer?: React$Element<any>,
  rowStyle?: Object,
  sortBy?: string,
  sortCallback?: SortCallback,
  sortDirection?: "ASC" | "DESC",
  style?: Object,
  tabIndex?: number,
  width: number | string
|};

export default class Table extends PureComponent<Props> {
  _listRef: React$Element<typeof List>;

  _setListRef = (ref: React$Element<typeof List>) => {
    this._listRef = ref;
  };

  render() {
    return createElement('div', null, 'HI!');
  }
}
/*
export default class Table extends React.PureComponent<Props> {
  _listRef: React.Element<typeof List>;

  _setListRef = (ref: React.Element<typeof List>) => {
    this._listRef = ref;
  };

  render() {
    return <div>hi</div>;

    const {
      children,
      className,
      disableHeader,
      gridClassName,
      gridStyle,
      headerHeight,
      headerRowRenderer,
      height,
      id,
      noRowsRenderer,
      rowClassName,
      rowStyle,
      scrollToIndex,
      style,
      width
    } = this.props;
    const { scrollbarWidth } = this.state;

    const availableRowsHeight = disableHeader ? height : height - headerHeight;

    const rowClass =
      typeof rowClassName === "function"
        ? rowClassName({ index: -1 })
        : rowClassName;
    const rowStyleObject =
      typeof rowStyle === "function" ? rowStyle({ index: -1 }) : rowStyle;

    // Precompute and cache column styles before rendering rows and columns to speed things up
    this._cachedColumnStyles = [];
    React.Children.toArray(children).forEach((column, index) => {
      const flexStyles = this._getFlexStyleForColumn(
        column,
        column.props.style
      );

      this._cachedColumnStyles[index] = {
        ...flexStyles,
        overflow: "hidden"
      };
    });

    // Note that we specify :rowCount, :scrollbarWidth, :sortBy, and :sortDirection as properties on Grid even though these have nothing to do with Grid.
    // This is done because Grid is a pure component and won't update unless its properties or state has changed.
    // Any property that should trigger a re-render of Grid then is specified here to avoid a stale display.
    return (
      <div
        aria-label={this.props["aria-label"]}
        aria-labelledby={this.props["aria-labelledby"]}
        aria-colcount={React.Children.toArray(children).length}
        aria-rowcount={this.props.rowCount}
        className={cn("ReactVirtualized__Table", className)}
        id={id}
        role="grid"
        style={style}
      >
        {!disableHeader &&
          headerRowRenderer({
            className: cn("ReactVirtualized__Table__headerRow", rowClass),
            columns: this._getHeaderColumns(),
            style: {
              height: headerHeight,
              overflow: "hidden",
              paddingRight: scrollbarWidth,
              width: width,
              ...rowStyleObject
            }
          })}

        <Grid
          {...this.props}
          autoContainerWidth
          className={cn("ReactVirtualized__Table__Grid", gridClassName)}
          cellRenderer={this._createRow}
          columnWidth={width}
          columnCount={1}
          height={availableRowsHeight}
          id={undefined}
          noContentRenderer={noRowsRenderer}
          onScroll={this._onScroll}
          onSectionRendered={this._onSectionRendered}
          ref={this._setRef}
          role="rowgroup"
          scrollbarWidth={scrollbarWidth}
          scrollToRow={scrollToIndex}
          style={{
            ...gridStyle,
            overflowX: "hidden"
          }}
        />
      </div>
    );
  }

  _createColumn({
    column,
    columnIndex,
    isScrolling,
    parent,
    rowData,
    rowIndex
  }) {
    const { onColumnClick } = this.props;
    const {
      cellGetter,
      cellRenderer,
      className,
      columnData,
      dataKey,
      id
    } = column.props;

    const cellData = cellGetter({ columnData, dataKey, rowData });
    const renderedCell = cellRenderer({
      cellData,
      columnData,
      columnIndex,
      dataKey,
      isScrolling,
      parent,
      rowData,
      rowIndex
    });

    const onClick = event => {
      onColumnClick && onColumnClick({ columnData, dataKey, event });
    };

    const style = this._cachedColumnStyles[columnIndex];

    const title = typeof renderedCell === "string" ? renderedCell : null;

    // Avoid using object-spread syntax with multiple objects here,
    // Since it results in an extra method call to 'babel-runtime/helpers/extends'
    // See PR https://github.com/bvaughn/react-virtualized/pull/942
    return (
      <div
        aria-colindex={columnIndex + 1}
        aria-describedby={id}
        className={cn("ReactVirtualized__Table__rowColumn", className)}
        key={"Row" + rowIndex + "-" + "Col" + columnIndex}
        onClick={onClick}
        role="gridcell"
        style={style}
        title={title}
      >
        {renderedCell}
      </div>
    );
  }

  _createHeader({ column, index }) {
    const {
      headerClassName,
      headerStyle,
      onHeaderClick,
      sort,
      sortBy,
      sortDirection
    } = this.props;
    const {
      columnData,
      dataKey,
      defaultSortDirection,
      disableSort,
      headerRenderer,
      id,
      label
    } = column.props;
    const sortEnabled = !disableSort && sort;

    const classNames = cn(
      "ReactVirtualized__Table__headerColumn",
      headerClassName,
      column.props.headerClassName,
      {
        ReactVirtualized__Table__sortableHeaderColumn: sortEnabled
      }
    );
    const style = this._getFlexStyleForColumn(column, {
      ...headerStyle,
      ...column.props.headerStyle
    });

    const renderedHeader = headerRenderer({
      columnData,
      dataKey,
      disableSort,
      label,
      sortBy,
      sortDirection
    });

    let headerOnClick,
      headerOnKeyDown,
      headerTabIndex,
      headerAriaSort,
      headerAriaLabel;

    if (sortEnabled || onHeaderClick) {
      // If this is a sortable header, clicking it should update the table data's sorting.
      const isFirstTimeSort = sortBy !== dataKey;

      // If this is the firstTime sort of this column, use the column default sort order.
      // Otherwise, invert the direction of the sort.
      const newSortDirection = isFirstTimeSort
        ? defaultSortDirection
        : sortDirection === SortDirection.DESC
          ? SortDirection.ASC
          : SortDirection.DESC;

      const onClick = event => {
        sortEnabled &&
          sort({
            defaultSortDirection,
            event,
            sortBy: dataKey,
            sortDirection: newSortDirection
          });
        onHeaderClick && onHeaderClick({ columnData, dataKey, event });
      };

      const onKeyDown = event => {
        if (event.key === "Enter" || event.key === " ") {
          onClick(event);
        }
      };

      headerAriaLabel = column.props["aria-label"] || label || dataKey;
      headerAriaSort = "none";
      headerTabIndex = 0;
      headerOnClick = onClick;
      headerOnKeyDown = onKeyDown;
    }

    if (sortBy === dataKey) {
      headerAriaSort =
        sortDirection === SortDirection.ASC ? "ascending" : "descending";
    }

    // Avoid using object-spread syntax with multiple objects here,
    // Since it results in an extra method call to 'babel-runtime/helpers/extends'
    // See PR https://github.com/bvaughn/react-virtualized/pull/942
    return (
      <div
        aria-label={headerAriaLabel}
        aria-sort={headerAriaSort}
        className={classNames}
        id={id}
        key={"Header-Col" + index}
        onClick={headerOnClick}
        onKeyDown={headerOnKeyDown}
        role="columnheader"
        style={style}
        tabIndex={headerTabIndex}
      >
        {renderedHeader}
      </div>
    );
  }

  _createRow({ rowIndex: index, isScrolling, key, parent, style }) {
    const {
      children,
      onRowClick,
      onRowDoubleClick,
      onRowRightClick,
      onRowMouseOver,
      onRowMouseOut,
      rowClassName,
      rowGetter,
      rowRenderer,
      rowStyle
    } = this.props;

    const { scrollbarWidth } = this.state;

    const rowClass =
      typeof rowClassName === "function"
        ? rowClassName({ index })
        : rowClassName;
    const rowStyleObject =
      typeof rowStyle === "function" ? rowStyle({ index }) : rowStyle;
    const rowData = rowGetter({ index });

    const columns = React.Children.toArray(children).map(
      (column, columnIndex) =>
        this._createColumn({
          column,
          columnIndex,
          isScrolling,
          parent,
          rowData,
          rowIndex: index,
          scrollbarWidth
        })
    );

    const className = cn("ReactVirtualized__Table__row", rowClass);
    const flattenedStyle = {
      ...style,
      height: this._getRowHeight(index),
      overflow: "hidden",
      paddingRight: scrollbarWidth,
      ...rowStyleObject
    };

    return rowRenderer({
      className,
      columns,
      index,
      isScrolling,
      key,
      onRowClick,
      onRowDoubleClick,
      onRowRightClick,
      onRowMouseOver,
      onRowMouseOut,
      rowData,
      style: flattenedStyle
    });
  }
}
*/