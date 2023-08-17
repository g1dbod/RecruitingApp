import React from 'react'
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { filterSlice } from '../store/reducers/FilterSlice';

const Pager = () => {
  const dispatch = useAppDispatch()
  const { page } = useAppSelector(state => state.filterReducer)
  const { count } = useAppSelector(state => state.dataReducer.data)

  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(filterSlice.actions.setPage(event.selected+1))}
      pageRangeDisplayed={3}
      pageCount={Math.round(count/20)}
      previousLabel="<"
    />
  )
}

export default Pager