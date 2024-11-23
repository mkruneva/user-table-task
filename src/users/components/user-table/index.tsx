import { Table, type TableColumn } from '../../../components/table'
import { type User } from '../../user-types'
import { useUserContext } from '../../../contexts/user-context'

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
  const { users, error, isLoading } = useUserContext()

  return (
    <Table
      data={users}
      columns={USERS_TABLE_COLUMNS}
      isLoading={isLoading}
      error={error}
      renderRow={renderRow}
    />
  )
}
