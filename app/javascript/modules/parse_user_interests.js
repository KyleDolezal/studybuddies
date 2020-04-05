const parseUserInterests = (included_records_list, type, attribute) => {
  if (included_records_list==null){
    return []
  }
  return included_records_list.filter((record) => {
    return(record['type'] == type)
  }).map((record) => {
    const object = {}
    object[attribute] = record['attributes'][attribute]
    object['id'] = record['id']
    return(object)
  })
}

export default parseUserInterests;
