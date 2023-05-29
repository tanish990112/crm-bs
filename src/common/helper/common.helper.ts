import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/repository/users/users.repository';

@Injectable()
export class CommonHelper {
  constructor(private userRepository: UsersRepository) {}

  async getAllChildren(parentId: number): Promise<number[]> {
    const allChildren = await this.userRepository.findUsers({
      where: {
        parent: parentId,
      },
      select: { userId: true },
    });
    const childrenId = [parentId];

    allChildren.forEach((child: Users) => {
      childrenId.push(child.userId);
    });
    return childrenId;
  }
  catch(error) {
    throw error;
  }
}
