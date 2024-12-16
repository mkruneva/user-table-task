import { Table, type TableColumn } from '../../../components/table'
import { type User } from '../../user-types'
import { useUserContext } from '../../../contexts/user-context'
import { Pagination } from '../../../components/table/pagination'
import { useMemo } from 'react'

const USERS_TABLE_COLUMNS: TableColumn<User, keyof User>[] = [
  {
    label: 'Image',
    accessor: 'image',
    renderCellContent: ({ rowData: { image, name } }) => {
      if (!image) return <div className="avatar placeholder" />
      return (
        <img
          className="avatar"
          src={image}
          alt={`${name}'s avatar`}
          width={40}
          height={40}
        />
      )
    },
  },
  { label: 'Name', accessor: 'name' },
  { label: 'Email', accessor: 'email' },
  { label: 'Phone', accessor: 'phone' },
]

const renderRow = (_row: User, index: number) => {
  const isEvenRow = index % 2 === 0
  const backgroundColor = isEvenRow ? 'var(--white)' : 'var(--gray-50)'

  return {
    style: { backgroundColor },
  }
}

export const UserTable = () => {
  const {
    users,
    totalNumUsers,
    currentPage,
    pageSize,
    getUsers,
    isLoading,
    error,
  } = useUserContext()

  console.log('currentPage', currentPage)
  console.log('totalNumUsers', totalNumUsers)
  console.log('pageSize', pageSize)

  const paginationLabel = useMemo(() => {
    const firstItemIndex = 1 + pageSize * (currentPage - 1)
    const lastItemIndex = Math.min(totalNumUsers, currentPage * pageSize)
    return `${firstItemIndex}-${lastItemIndex} of ${totalNumUsers} items`
  }, [currentPage, pageSize, totalNumUsers])

  const handlePageChange = (page: number) => {
    // TODO: use the set searchTerm if exists in context provider
    getUsers({ searchTerm: undefined, pageToGet: page })
  }

  return (
    <div className="table-wrapper">
      <Table
        data={users}
        columns={USERS_TABLE_COLUMNS}
        isLoading={isLoading}
        error={error}
        renderRow={renderRow}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalNumUsers / pageSize)}
        onPageChange={handlePageChange}
        paginationLabel={paginationLabel}
        isLoading={isLoading}
      />
    </div>
  )
}
