import { container } from 'tsyringe';
import uploadConfig from '../../../config/upload';

import IStorageProvider from './DiskStorageProvider/models/IStorageProvider';
import DiskStorageProvider from './DiskStorageProvider/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
