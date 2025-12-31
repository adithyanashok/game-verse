import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionController } from './discussion.controller';
import { DiscussionService } from './discussion.service';

describe('DiscussionController', () => {
  let discussionController: DiscussionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DiscussionController],
      providers: [DiscussionService],
    }).compile();

    discussionController = app.get<DiscussionController>(DiscussionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(discussionController.getHello()).toBe('Hello World!');
    });
  });
});
