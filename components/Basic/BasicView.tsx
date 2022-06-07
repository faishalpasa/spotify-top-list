import React from 'react'

import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Typography,
  TextField,
} from '@mui/material'

import type { PropsFromSelector } from './basicSelector'

interface ViewProps extends PropsFromSelector {
  handleAutocomplete: (value: string) => void
  handleFetchNewsComment: (newsId: number) => void
  handleChangeField: (fieldName: string, value: string) => void
  handleSubmitForm: () => void
  fields: {
    name: string
    comment: string
  }
}

const BasicView = ({
  handleAutocomplete,
  handleFetchNewsComment,
  handleChangeField,
  handleSubmitForm,
  fields,
  news,
}: ViewProps) => (
  <Box flex={1}>
    <Typography component="h2" variant="h4" sx={{ textAlign: 'center', paddingBottom: 1 }}>
      Without Observable
    </Typography>

    <Divider />

    <Box pt={2} pb={2}>
      <Typography component="h3" variant="h5" sx={{ paddingBottom: 1 }}>
        Fetching Data
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleFetchNewsComment(1)}
        disabled={news.isLoading}
      >
        Get News Comment
      </Button>
      <Box>
        <ul>
          {news.comments.map(comment => (
            <li key={comment.id}>
              <Typography>{comment.body}</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Box>

    <Divider />

    <Box pt={2} pb={2}>
      <Typography component="h3" variant="h5" sx={{ paddingBottom: 1 }}>
        Fetch Autocomplete
      </Typography>
      <Autocomplete
        freeSolo
        disableClearable
        options={news.autocompleteComments.map((option: any) => option.body)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Type some text"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={(event) => handleAutocomplete(event.target.value)}
          />
        )}
      />
    </Box>

    <Divider />

    <Box pt={2} pb={2}>
      <Typography component="h3" variant="h5" sx={{ paddingBottom: 1 }}>
        Submit Data
      </Typography>
      <Box component="form" display="flex" flexDirection="column" gap={2} autoComplete="off">
        <TextField
          label="Type some text"
          name="name"
          value={fields.name}
          onChange={(event) => handleChangeField('name', event.target.value)}
        />
        <TextField
          label="Type some text"
          name="comment"
          value={fields.comment}
          multiline
          rows={4}
          onChange={(event) => handleChangeField('comment', event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          // disabled={news.isLoading}
          onClick={handleSubmitForm}
        >
          Submit Comment
        </Button>
      </Box>
    </Box>

  </Box>
)

export default BasicView