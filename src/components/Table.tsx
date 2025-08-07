import React from 'react'
import clsx from 'clsx'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  overrideContainerClasses?: boolean
  containerStyle?: React.CSSProperties
  scrollContainerClassName?: string
  style?: React.CSSProperties
}

export function Table({
  children,
  className,
  containerClassName,
  overrideContainerClasses = false,
  containerStyle,
  scrollContainerClassName,
  style,
  ...props
}: TableProps) {
  // Determine container classes based on override preference
  const containerClasses = overrideContainerClasses
    ? containerClassName || ''
    : clsx('my-6 flex w-full justify-center', containerClassName)

  return (
    <div className={containerClasses} style={containerStyle}>
      <table
        className={clsx('inline-table', className)}
        style={style}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
  className?: string
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  )
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
  className?: string
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  className?: string
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  )
}

interface TableHeaderProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  className?: string
}

export function TableHeader({
  children,
  className,
  ...props
}: TableHeaderProps) {
  return (
    <th className={className} {...props}>
      {children}
    </th>
  )
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  className?: string
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  )
}

// Export compound component
Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Header = TableHeader
Table.Cell = TableCell

export default Table
