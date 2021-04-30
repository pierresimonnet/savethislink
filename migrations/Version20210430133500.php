<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210430133500 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE website DROP CONSTRAINT fk_476f5de7f675f31b');
        $this->addSql('DROP INDEX idx_476f5de7f675f31b');
        $this->addSql('ALTER TABLE website RENAME COLUMN author_id TO owner_id');
        $this->addSql('ALTER TABLE website ADD CONSTRAINT FK_476F5DE77E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_476F5DE77E3C61F9 ON website (owner_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE website DROP CONSTRAINT FK_476F5DE77E3C61F9');
        $this->addSql('DROP INDEX IDX_476F5DE77E3C61F9');
        $this->addSql('ALTER TABLE website RENAME COLUMN owner_id TO author_id');
        $this->addSql('ALTER TABLE website ADD CONSTRAINT fk_476f5de7f675f31b FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_476f5de7f675f31b ON website (author_id)');
    }
}
