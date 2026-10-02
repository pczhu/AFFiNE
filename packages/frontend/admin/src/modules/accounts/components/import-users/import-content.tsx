import { translateUiText, useUiLanguage } from '@affine/i18n';
import type { FC, RefObject } from 'react';

import type { ParsedUser } from '../../utils/csv-utils';
import { UserTable } from '../user-table';
import { CsvFormatGuidance } from './csv-format-guidance';
import { FileUploadArea, type FileUploadAreaRef } from './file-upload-area';

interface ImportPreviewContentProps {
  parsedUsers: ParsedUser[];
  isImported: boolean;
}

/**
 * Component for the preview mode content
 */
export const ImportPreviewContent: FC<ImportPreviewContentProps> = ({
  parsedUsers,
  isImported,
}) => {
  useUiLanguage();
  return (
    <div className="grid gap-3">
      {!isImported && (
        <p className="text-sm text-muted-foreground">
          {parsedUsers.length}{' '}
          {translateUiText(
            'users detected from the CSV file. Please confirm\n          the user list below and import.\n        '
          )}
        </p>
      )}
      <UserTable users={parsedUsers} />
    </div>
  );
};

interface ImportInitialContentProps {
  passwordLimits: {
    minLength: number;
    maxLength: number;
  };
  fileUploadRef: RefObject<FileUploadAreaRef | null>;
  onFileSelected: (file: File) => Promise<void>;
}

/**
 * Component for the initial import screen
 */
export const ImportInitialContent: FC<ImportInitialContentProps> = ({
  passwordLimits,
  fileUploadRef,
  onFileSelected,
}) => {
  useUiLanguage();
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted-foreground">
        {translateUiText(
          'You need to import the accounts by importing a CSV file in the correct\n        format. Please download the CSV template.\n      '
        )}
      </p>
      <CsvFormatGuidance passwordLimits={passwordLimits} />
      <FileUploadArea ref={fileUploadRef} onFileSelected={onFileSelected} />
    </div>
  );
};

interface ImportErrorContentProps {
  message?: string;
}

/**
 * Component for displaying import errors
 */
export const ImportErrorContent: FC<ImportErrorContentProps> = ({
  message = translateUiText(
    'You need to import the accounts by importing a CSV file in the correct format. Please download the CSV template.'
  ),
}) => {
  useUiLanguage();

  return message;
};
