<?php

namespace App\Command;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class ChangeRoleCommand extends Command
{
    protected static $defaultName = 'app:change-role';
    protected static $defaultDescription = 'Change role of a user';

    private SymfonyStyle $io;
    private UserRepository $userRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    protected function configure()
    {
        $this
            ->setHidden(true)
            ->setDescription(self::$defaultDescription)
            ->addArgument('username', InputArgument::REQUIRED, 'The username of the user')
        ;
    }

    protected function initialize(InputInterface $input, OutputInterface $output)
    {
        $this->io = new SymfonyStyle($input, $output);
    }

    protected function interact(InputInterface $input, OutputInterface $output)
    {
        $this->io->title("Change the role of a user");

        $username = $input->getArgument('username');

        if ($username) {
            $this->io->text(' > <info>Username</info>: '. $username);
        } else {
            $username = $this->io->ask('Username', null, function ($username) {
                if (empty($username)) {
                    throw new \Exception("Username cannot be empty", 1);
                    
                }

                return $username;
            });

            $input->setArgument('username', $username);
        }
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $username = $input->getArgument('username');

        $user = $this->userRepository->findOneBy(['username' => $username]);
        if (!$user) {
            $this->io->writeln($username.' not found');
            
            return Command::FAILURE;
        } 

        $this->io->writeln($username.' found');

        if (!$this->io->confirm('Are you sure you want to change the role of this user ?', false)) {
            return Command::FAILURE;
        }

        $role = $this->io->choice('Select a role', ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']);
        $user->setRoles([$role]);
        $this->entityManager->flush();

        $this->io->success(sprintf('The role of the user named %s has been changed', $username));

        return Command::SUCCESS;
    }
}
